<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      normalizationContext = {"groups" = { "reservation-with-panier" }},
 *       denormalizationContext={"groups"={"write"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ReservationRepository")
 */
class Reservation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"reservation-with-panier", "write"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     *  @Groups({"reservation-with-panier", "write"})
     */
    private $dateReservation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Client", inversedBy="reservations")
     *  @Groups({"reservation-with-panier", "write"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $client;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ReservationPlat", mappedBy="reservation", cascade={"persist", "remove"})
     *  @Groups({"reservation-with-panier", "write"})
     */
    private $panier;

    public function __construct()
    {
        $this->panier = new ArrayCollection();
    }



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

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(?Client $client): self
    {
        $this->client = $client;

        return $this;
    }

    /**
     * @return Collection|ReservationPlat[]
     */
    public function getPanier(): Collection
    {
        return $this->panier;
    }

    public function addPanier(ReservationPlat $panier): self
    {
        if (!$this->panier->contains($panier)) {
            $this->panier[] = $panier;
            $panier->setReservation($this);
        }

        return $this;
    }

    public function removePanier(ReservationPlat $panier): self
    {
        if ($this->panier->contains($panier)) {
            $this->panier->removeElement($panier);
            // set the owning side to null (unless already changed)
            if ($panier->getReservation() === $this) {
                $panier->setReservation(null);
            }
        }

        return $this;
    }

}
