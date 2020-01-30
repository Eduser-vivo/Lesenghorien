<?php

namespace App\DataFixtures;


use App\Entity\Client;
use App\Entity\Reservation;
use App\DataFixtures\BaseFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReservationFixtures extends BaseFixture implements DependentFixtureInterface
{

    public function loadData(ObjectManager $manager)
    {
        $this->createMany(Reservation::class, 15, function (Reservation $reservation, $count) use ($manager) {
            $client = $this->getReference(Client::class . '_' . $count);
            $reservation->setDateReservation($this->faker->dateTime())
                ->setClient($client);
            $manager->flush();
        });
    }

    public function getDependencies()
    {
        return [
            ClientFixtures::class,
        ];
    }
}
