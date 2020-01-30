<?php


namespace App\DataFixtures;

use App\DataFixtures\BaseFixture;
use App\Entity\Client;
use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends BaseFixture 
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(User::class, 15, function (User $user, $count) use ($manager) {
        $user->setUsername('utilisateur'.$count)
        	->setEmail($this->faker->email())
        	->setPassword($this->encode->encodePassword(
            $user, 
            'adminpass'
        ));
            $manager->flush();
        });
    }
}