<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ClientRepository")
 */
class Client
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *@Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Veuiller renseigner votre nom")
     * @Assert\Length(
     * min=2,
     * minMessage="Votre nom est invalide"
     * )
     *@Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Veuiller renseigner votre prenom")
     * @Assert\Length(
     * min=2,
     * minMessage="Votre prenom est invalide"
     * )
     *@Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Veuiller renseigner votre numero de téléphone")
     * @Assert\Length(
     * min=8,
     * minMessage="Votre numero de telephone est invalide"
     * )
     *@Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $numero;

    /**
     * @ORM\Column(type="date")
     *@Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $dateCreation;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ReservationBus", mappedBy="client")
     */
    private $reservationBuses;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reservation", mappedBy="client")
     */
    private $reservations;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="client", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

  
    public function __construct()
    {
        $this->reservationBuses = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNumero(): ?string
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

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
            $reservationBus->setClient($this);
        }

        return $this;
    }

    public function removeReservationBus(ReservationBus $reservationBus): self
    {
        if ($this->reservationBuses->contains($reservationBus)) {
            $this->reservationBuses->removeElement($reservationBus);
            // set the owning side to null (unless already changed)
            if ($reservationBus->getClient() === $this) {
                $reservationBus->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Reservation[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setClient($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->contains($reservation)) {
            $this->reservations->removeElement($reservation);
            // set the owning side to null (unless already changed)
            if ($reservation->getClient() === $this) {
                $reservation->setClient(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
