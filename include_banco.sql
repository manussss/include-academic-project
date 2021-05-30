DROP DATABASE IF EXISTS include;
CREATE DATABASE IF NOT EXISTS include;
USE include;

CREATE TABLE IF NOT EXISTS extratos(
    idExtrato INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo BOOLEAN NOT NULL,
    PRIMARY KEY (idExtrato)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO extratos VALUES (0, 'Pagamento março/2021', 'Pagamento março/2021', 1500.00, 1);
INSERT INTO extratos VALUES (0, 'Conta de luz março/2021', 'Conta de luz março/2021', 150.00, 0);
INSERT INTO extratos VALUES (0, 'Conta de luz abril/2021', 'Conta de luz abril/2021', 127.00, 0);
