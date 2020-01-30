<?php

namespace App\DataFixtures;


use App\Entity\Plat;
use App\DataFixtures\BaseFixture;
use Doctrine\Common\Persistence\ObjectManager;

class PlatFixtures extends BaseFixture
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(Plat::class, 15, function (Plat $plat, $count) use ($manager) {
            $plat->setNom("steak de boeuf")
                ->setPrix($this->faker->numberBetween(100, 1000))
                ->setDescription("viande de boeuf mariné avec du vin italien");
            $manager->flush();
        });
    }
}