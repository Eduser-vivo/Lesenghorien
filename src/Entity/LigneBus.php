<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     itemOperations={"get", "put", "delete"},
 *     collectionOperations={ "post",  "get"  },
 *      normalizationContext={  "groups" = { "get-ligne-with-horaire" }}
 *)
 * @ORM\Entity(repositoryClass="App\Repository\LigneBusRepository")
 */
class LigneBus
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $nom;

    /**
     * @ORM\Column(type="float")
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $distance;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $pointDepart;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-ligne-with-horaire", "get-reservation-with-horaire-and-client"})
     */
    private $pointArrivee;

    /**
     * @ORM\Column(type="date")
     *@Groups({"get-ligne-with-horaire"})
     */
    private $dateCreation;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Horaire", mappedBy="lignebus")
     *@Groups({"get-ligne-with-horaire"})
     */
    private $horaires;



    public function __construct()
    {
        $this->horaires = new ArrayCollection();
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

    public function getDistance(): ?float
    {
        return $this->distance;
    }

    public function setDistance(float $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getPointDepart(): ?string
    {
        return $this->pointDepart;
    }

    public function setPointDepart(string $pointDepart): self
    {
        $this->pointDepart = $pointDepart;

        return $this;
    }

    public function getPointArrivee(): ?string
    {
        return $this->pointArrivee;
    }

    public function setPointArrivee(string $pointArrivee): self
    {
        $this->pointArrivee = $pointArrivee;

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
     * @return Collection|Horaire[]
     */
    public function getHoraires(): Collection
    {
        return $this->horaires;
    }

    public function addHoraire(Horaire $horaire): self
    {
        if (!$this->horaires->contains($horaire)) {
            $this->horaires[] = $horaire;
            $horaire->setLignebus($this);
        }

        return $this;
    }

    public function removeHoraire(Horaire $horaire): self
    {
        if ($this->horaires->contains($horaire)) {
            $this->horaires->removeElement($horaire);
            // set the owning side to null (unless already changed)
            if ($horaire->getLignebus() === $this) {
                $horaire->setLignebus(null);
            }
        }

        return $this;
    }

}
