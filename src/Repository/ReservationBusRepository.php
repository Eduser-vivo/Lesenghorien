<?php

namespace App\Repository;

use App\Entity\ReservationBus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ReservationBus|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReservationBus|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReservationBus[]    findAll()
 * @method ReservationBus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationBusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ReservationBus::class);
    }

    // /**
    //  * @return ReservationBus[] Returns an array of ReservationBus objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ReservationBus
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
