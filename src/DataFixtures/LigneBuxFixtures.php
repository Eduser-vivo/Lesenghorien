<?php

namespace App\DataFixtures;

use App\DataFixtures\BaseFixture;
use App\Entity\LigneBus;
use Doctrine\Common\Persistence\ObjectManager;

class LigneBuxFixtures extends BaseFixture
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(LigneBus::class, 15, function (LigneBus $ligne, $count) use ($manager) {
            $ligne->setNom($this->faker->sentence(20))
                ->setPointArrivee($this->faker->sentence(10))
                ->setPointDepart($this->faker->sentence(10))
                ->setDistance(mt_rand(0, 10000))
                ->setDateCreation($this->faker->dateTime());
            $manager->flush();
        });
    }
}