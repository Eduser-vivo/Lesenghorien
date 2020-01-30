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
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *          "username": "exact"
 *      }
 * )
 * @ApiResource(
  *     itemOperations={"get", "put", "delete"},
 *     collectionOperations={
 *          "post",
 *          "get" = {
 *                 "normalization_context" = {
 *                        "groups" = { "get-user-with-client" }
 *                  }
 *           }
 *      }
 *)
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity("username")
 * @UniqueEntity("email")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *@Groups({"get-user-with-client"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-user-with-client"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-user-with-client"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     *@Groups({"get-user-with-client"})
     */
    private $email;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Client", mappedBy="user", cascade={"persist", "remove"})
     *@Groups({"get-user-with-client"})
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
