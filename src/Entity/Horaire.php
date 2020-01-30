<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\HoraireRepository")
 */
class Horaire
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $id;

    /**
     * @ORM\Column(type="time")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $heureDepart;

    /**
     * @ORM\Column(type="time")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $heureArrivee;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $nombrePlaces;

    /**
     * @ORM\Column(type="date")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="date")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $dateValidite;

    /**
     * @ORM\Column(type="integer")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $montant;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\LigneBus", inversedBy="horaires")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"get-reservation-with-horaire-and-client"})
     */ 
    private $lignebus;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ReservationBus", mappedBy="horaire")
     */
    private $reservationBuses;

    public function __construct()
    {
        $this->reservationBuses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getHeureDepart(): ?\DateTimeInterface
    {
        return $this->heureDepart;
    }

    public function setHeureDepart(\DateTimeInterface $heureDepart): self
    {
        $this->heureDepart = $heureDepart;

        return $this;
    }

    public function getHeureArrivee(): ?\DateTimeInterface
    {
        return $this->heureArrivee;
    }

    public function setHeureArrivee(\DateTimeInterface $heureArrivee): self
    {
        $this->heureArrivee = $heureArrivee;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getNombrePlaces(): ?int
    {
        return $this->nombrePlaces;
    }

    public function setNombrePlaces(int $nombrePlaces): self
    {
        $this->nombrePlaces = $nombrePlaces;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getDateValidite(): ?\DateTimeInterface
    {
        return $this->dateValidite;
    }

    public function setDateValidite(\DateTimeInterface $dateValidite): self
    {
        $this->dateValidite = $dateValidite;

        return $this;
    }

    public function getMontant(): ?int
    {
        return $this->montant;
    }

    public function setMontant(int $montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getLignebus(): ?LigneBus
    {
        return $this->lignebus;
    }

    public function setLignebus(?LigneBus $lignebus): self
    {
        $this->lignebus = $lignebus;

        return $this;
    }

    /**
     * @return Collection|ReservationBus[]
     */
    public function getReservationBuses(): Collection
    {
        return $this->reservationBuses;
    }

    public function addReservationBus(ReservationBus $reservationBus): self
    {
        if (!$this->reservationBuses->contains($reservationBus)) {
            $this->reservationBuses[] = $reservationBus;
            $reservationBus->setHoraire($this);
        }

        return $this;
    }

    public function removeReservationBus(ReservationBus $reservationBus): self
    {
        if ($this->reservationBuses->contains($reservationBus)) {
            $this->reservationBuses->removeElement($reservationBus);
            // set the owning side to null (unless already changed)
            if ($reservationBus->getHoraire() === $this) {
                $reservationBus->setHoraire(null);
            }
        }

        return $this;
    }
}
