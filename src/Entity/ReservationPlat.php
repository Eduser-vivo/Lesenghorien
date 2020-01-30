<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ReservationPlatRepository")
 */
class ReservationPlat
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *  @Groups({"reservation-with-panier", "write"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Plat", inversedBy="reservationPlats")
     * @ORM\JoinColumn(nullable=false)
     *  @Groups({"reservation-with-panier", "write"})
     */
    private $plat;

    /**
     * @ORM\Column(type="integer")
     *  @Groups({"reservation-with-panier", "write"})
     */
    private $quantite;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Reservation", inversedBy="panier")
     */
    private $reservation;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlat(): ?Plat
    {
        return $this->plat;
    }

    public function setPlat(?Plat $plat): self
    {
        $this->plat = $plat;

        return $this;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(?Reservation $reservation): self
    {
        $this->reservation = $reservation;

        return $this;
    }

}
