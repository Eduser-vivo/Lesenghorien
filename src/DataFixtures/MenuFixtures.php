<?php

namespace App\DataFixtures;

use App\Entity\Menu;
use App\Entity\Plat;
use App\DataFixtures\BaseFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class MenuFixtures extends BaseFixture implements DependentFixtureInterface
{
    public function loadData(ObjectManager $manager)
    {
        $this->createMany(Menu::class, 15, function (Menu $menu, $count) use ($manager) {
            $plat = $this->getReference(Plat::class . '_' . $count);
            $menu->setNom("menu à base de viande haché")
                ->setDateCreation($this->faker->dateTime())
                ->setDateValidite($this->faker->dateTime())
                ->setDescription("tout les plats sont préparé a base de viande de boeuf haché")
                ->addPlat($plat);
            $manager->flush();
        });
    }
    public function getDependencies()
    {
        return [
            PlatFixtures::class
        ];
    }
}