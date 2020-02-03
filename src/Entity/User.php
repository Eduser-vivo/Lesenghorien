<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource(
 *    normalizationContext = {"groups" = { "get-user-with-client" }},
 *     denormalizationContext={"groups"={"write-client-and-user"}}
 * )
 *
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "username": "exact"
 *      }
 * )
 * 
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity("username", message="ce nom d'utilisateur existe déjà veuillez changer")
 * @UniqueEntity("email", message=" cet email existe déjà veuillez changer")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get-user-with-client","write-client-and-user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get-user-with-client","write-client-and-user"})
     * @Assert\NotBlank(message="Veuiller renseigner votre nom d'utilisateur")
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get-user-with-client","write-client-and-user"})
     * @Assert\NotBlank(message="Veuiller renseigner votre mot de passe")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get-user-with-client","write-client-and-user"})
     * @Assert\NotBlank(message="Veuiller renseigner votre email")
     */
    private $email;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Client", mappedBy="user", cascade={"persist", "remove"})
     * @Groups({"get-user-with-client", "write-client-and-user"})
     */
    private $client;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
       return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {

    }

    public function getClient(): ?Client
    {
        return $this->client;
    }

    public function setClient(Client $client): self
    {
        $this->client = $client;

        // set the owning side of the relation if necessary
        if ($client->getUser() !== $this) {
            $client->setUser($this);
        }

        return $this;
    }
}
