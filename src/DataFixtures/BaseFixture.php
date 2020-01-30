<?php

namespace App\DataFixtures;

use Faker\Factory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

abstract class BaseFixture extends Fixture
{
    /**
     * Entity manager pour la persistence
     *
     * @var ObjectManager
     */
    protected $manager;
    /**
     * variable faker pour les fakes data
     *
     * @var Faker
     */
    protected $faker;

    public $encode;

    public function __construct(UserPasswordEncoderInterface $encode)
    {
        $this->encode = $encode;
    }

    abstract protected function loadData(ObjectManager $manager);

    public function load(ObjectManager $manager)
    {
        $this->manager = $manager;
        $factory = new Factory();
        $this->faker = $factory->create();
        $this->loadData($manager);
    }

    public function createMany($className, $count, callable $factory)
    {
        for ($i = 0; $i < $count; $i++) {
            $entity = new $className();
            $factory($entity, $i);
            $this->manager->persist($entity);
            $this->addReference($className . '_' . $i, $entity);
        }
    }
}