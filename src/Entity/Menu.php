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
 *     collectionOperations={"post", "get"},
 *     normalizationContext = {"groups" = { "get-menu-with-plats" }}
 *)
 * @ORM\Entity(repositoryClass="App\Repository\MenuRepository")
 */
class Menu
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get-menu-with-plats"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get-menu-with-plats"})
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get-menu-with-plats"})
     */
    private $description;

    /**
     * @ORM\Column(type="date")
     * @Groups({"get-menu-with-plats"})
     */
    private $dateCreation;

    /**
     * @ORM\Column(type="date")
     * @Groups({"get-menu-with-plats"})
     */
    private $dateValidite;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Plat", mappedBy="menu", cascade={"persist"})
     * @Groups({"get-menu-with-plats"})
     */
    private $plats;

    public function __construct()
    {
        $this->plats = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    /**
     * @return Collection|Plat[]
     */
    public function getPlats(): Collection
    {
        return $this->plats;
    }

    public function addPlat(Plat $plat): self
    {
        if (!$this->plats->contains($plat)) {
            $this->plats[] = $plat;
            $plat->addMenu($this);
        }

        return $this;
    }

    public function removePlat(Plat $plat): self
    {
        if ($this->plats->contains($plat)) {
            $this->plats->removeElement($plat);
            $plat->removeMenu($this);
        }

        return $this;
    }
}
