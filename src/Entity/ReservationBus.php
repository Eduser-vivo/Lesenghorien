<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReservationBusRepository")
 * @ApiResource(
 *       itemOperations={"get", "put", "delete"},
 *       collectionOperations={ "post", "get" },
 *       normalizationContext={"groups" = { "get-reservation-with-horaire-and-client" }}
 * )
 * 
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties = {
 *          "client.id" = "exact"
 *      }
 * )
 */
class ReservationBus
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get-reservation-with-horaire-and-client"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"get-reservation-with-horaire-and-client"})
     */
    private $dateReservation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Horaire", inversedBy="reservationBuses")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"get-reservation-with-horaire-and-client"})
     */
    private $horaire;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="reservationBuses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $client;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateReservation(): ?\DateTimeInterface
    {
        return $this->dateReservation;
    }

    public function setDateReservation(\DateTimeInterface $dateReservation): self
    {
        $this->dateReservation = $dateReservation;

        return $this;
    }

    public function getHoraire(): ?Horaire
    {
        return $this->horaire;
    }

    public function setHoraire(?Horaire $horaire): self
    {
        $this->horaire = $horaire;

        return $this;
    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }
}
