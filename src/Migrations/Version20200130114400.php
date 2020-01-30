<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200130114400 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE reservation_plat ADD reservation_id INT DEFAULT NULL, ADD quantite INT NOT NULL');
        $this->addSql('ALTER TABLE reservation_plat ADD CONSTRAINT FK_36016F6FD73DB560 FOREIGN KEY (plat_id) REFERENCES plat (id)');
        $this->addSql('ALTER TABLE reservation_plat ADD CONSTRAINT FK_36016F6FB83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('CREATE INDEX IDX_36016F6FD73DB560 ON reservation_plat (plat_id)');
        $this->addSql('CREATE INDEX IDX_36016F6FB83297E7 ON reservation_plat (reservation_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE reservation_plat DROP FOREIGN KEY FK_36016F6FD73DB560');
        $this->addSql('ALTER TABLE reservation_plat DROP FOREIGN KEY FK_36016F6FB83297E7');
        $this->addSql('DROP INDEX IDX_36016F6FD73DB560 ON reservation_plat');
        $this->addSql('DROP INDEX IDX_36016F6FB83297E7 ON reservation_plat');
        $this->addSql('ALTER TABLE reservation_plat DROP reservation_id, DROP quantite');
    }
}
