<?php

declare(strict_types=1);

namespace Devitools\Database\Migration;

use Devitools\Database\Migration;
use Devitools\Database\Schema;
use Devitools\Database\Table;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class TableAlter
 * @package Devitools\Database\Migration
 */
abstract class TableAlter extends Migration
{
    /**
     * @return string
     */
    abstract protected function table(): string;

    /**
     * @param Table $table
     * @return void
     */
    abstract protected function onUp(Table $table);

    /**
     * @param Table $table
     * @return void
     */
    abstract protected function onDown(Table $table);

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::alter($this->table(), function (Blueprint $blueprint) {
            $this->onUp(Table::make($blueprint));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::alter($this->table(), function (Blueprint $blueprint) {
            $this->onDown(Table::make($blueprint));
        });
    }
}
