<?php
namespace App\EventSubscriber;

use App\Entity\ReservationBus;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Client;
use App\Entity\Reservation;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class AutomaticSetData implements EventSubscriberInterface
{
  
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setDateAuto', EventPriorities::PRE_WRITE]
        ];
    }

    public function setDateAuto(GetResponseForControllerResultEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if(Request::METHOD_POST !== $method){
            return;
        }else{
            if($entity instanceof ReservationBus){
                $entity->setDateReservation(new \DateTime());
            }else{
                if($entity instanceof Reservation){
                    $entity->setDateReservation(new \DateTime());
                }
            }
        }

   }
}