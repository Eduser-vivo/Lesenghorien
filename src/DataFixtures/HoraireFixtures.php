<?php

namespace App\DataFixtures;

use App\Entity\Horaire;
use App\DataFixtures\BaseFixture;
use App\Entity\LigneBus;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class HoraireFixtures extends BaseFixture implements DependentFixtureInterface
{


    public function loadData(ObjectManager $manager)
    {
        $this->createMany(Horaire::class, 15, function (Horaire $horaire, $count) use ($manager) {
            $ligne = $this->getReference(LigneBus::class . '_' . $count);
            $horaire->setHeureArrivee(new \DateTime())
                ->setHeureDepart(new \DateTime())
                ->setDateCreation($this->faker->dateTime())
                ->setDateValidite($this->faker->dateTime())
                ->setNom($this->faker->sentence())
                ->setNombrePlaces($this->faker->randomDigitNotNull())
                ->setMontant($this->faker->numberBetween(100, 1000))
                ->setLigneBus($ligne);
            $manager->flush();
        });
    }

    public function getDependencies()
    {
        return [
            LigneBuxFixtures::class
        ];
    }
}