<?php

namespace App\DataFixtures;


use App\Entity\Plat;
use App\DataFixtures\BaseFixture;
use App\Entity\Reservation;
use App\Entity\ReservationPlat;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReservationPlatFixtures extends BaseFixture implements DependentFixtureInterface
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(ReservationPlat::class, 15, function (ReservationPlat $reservationPlat, $count) use ($manager) {
            $plat = $this->getReference(Plat::class . '_' . $count);
            $Reservation = $this->getReference(Reservation::class . '_' . $count);
            $reservationPlat->setNombre($this->faker->randomDigitNotNull())
                ->setIdPlat($plat)
                ->setIdReservation($Reservation);
            $manager->flush();
        });
    }
    public function getDependencies()
    {
        return [
            PlatFixtures::class,
            ReservationFixtures::class,
        ];
    }
}
