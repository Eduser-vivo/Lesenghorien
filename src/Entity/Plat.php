<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PlatRepository")
 */
class Plat
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
     * @ORM\Column(type="integer")
     * @Groups({"get-menu-with-plats"})
     */
    private $prix;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Menu", inversedBy="plats")
     */
    private $menu;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ReservationPlat", mappedBy="plat")
     */
    private $reservationPlats;

    public function __construct()
    {
        $this->menu = new ArrayCollection();
        $this->reservationPlats = new ArrayCollection();
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

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * @return Collection|Menu[]
     */
    public function getMenu(): Collection
    {
        return $this->menu;
    }

    public function addMenu(Menu $menu): self
    {
        if (!$this->menu->contains($menu)) {
            $this->menu[] = $menu;
        }

        return $this;
    }

    public function removeMenu(Menu $menu): self
    {
        if ($this->menu->contains($menu)) {
            $this->menu->removeElement($menu);
        }

        return $this;
    }

    /**
     * @return Collection|ReservationPlat[]
     */
    public function getReservationPlats(): Collection
    {
        return $this->reservationPlats;
    }

    public function addReservationPlat(ReservationPlat $reservationPlat): self
    {
        if (!$this->reservationPlats->contains($reservationPlat)) {
            $this->reservationPlats[] = $reservationPlat;
            $reservationPlat->setPlat($this);
        }

        return $this;
    }

    public function removeReservationPlat(ReservationPlat $reservationPlat): self
    {
        if ($this->reservationPlats->contains($reservationPlat)) {
            $this->reservationPlats->removeElement($reservationPlat);
            // set the owning side to null (unless already changed)
            if ($reservationPlat->getPlat() === $this) {
                $reservationPlat->setPlat(null);
            }
        }

        return $this;
    }

}
