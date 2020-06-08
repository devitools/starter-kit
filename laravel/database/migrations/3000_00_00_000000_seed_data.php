<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;

/**
 * Class SeedData
 */
class SeedData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * @throws Exception
     */
    public function up()
    {
        DatabaseSeeder::instance()->run();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
