<?php

namespace App\DataFixtures;

use App\DataFixtures\BaseFixture;
use App\Entity\Client;
use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ClientFixtures extends BaseFixture implements DependentFixtureInterface
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(Client::class, 15, function (Client $client, $count) use ($manager) {
        $user = $this->getReference(User::class . '_' . $count);
            $client->setNom($this->faker->name())
                ->setPrenom($this->faker->name())
                ->setNumero($this->faker->phoneNumber())
                ->setDateCreation($this->faker->dateTime())
                ->setUser($user)
                ;
            $manager->flush();
        });
    }
     public function getDependencies()
    {
        return [
            UserFixtures::class
        ];
    }
}
