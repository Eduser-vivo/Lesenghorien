<?php

namespace App\Repository;

use App\Entity\ReservationPlat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ReservationPlat|null find($id, $lockMode = null, $lockVersion = null)
 * @method ReservationPlat|null findOneBy(array $criteria, array $orderBy = null)
 * @method ReservationPlat[]    findAll()
 * @method ReservationPlat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationPlatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ReservationPlat::class);
    }

    // /**
    //  * @return ReservationPlat[] Returns an array of ReservationPlat objects
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
    public function findOneBySomeField($value): ?ReservationPlat
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
