-- Criação do DW (MySQL)
-- MySQL Wocornearkbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
-- -----------------------------------------------------
-- Schema DW_Cornea
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema DW_Cornea
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DW_Cornea` DEFAULT CHARACTER SET utf8 ;
USE `DW_Cornea` ;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_Tempo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Tempo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_reg` DATE NOT NULL,
  `fim_semana` VARCHAR(1) NOT NULL,
  `feriado` VARCHAR(1) NOT NULL,
  `semestre` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`SDIM_cod_postal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`SDIM_cod_postal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cod_postal` VARCHAR(4) NOT NULL,
  `cidade` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_paciente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_paciente` INT NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `genero` VARCHAR(10) NOT NULL,
  `id_cod_postal` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dicp_idx` (`id_cod_postal` ASC),
  CONSTRAINT `fk_dicp`
    FOREIGN KEY (`id_cod_postal`)
    REFERENCES `DW_Cornea`.`SDIM_cod_postal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_Prioridade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Prioridade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_diagnostico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Diagnostico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_tipo_procedimento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Tipo_Procedimento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo_procedimento` VARCHAR(10) NOT NULL,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_lateralidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Lateralidade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_diarreia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Anestesia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Cornea`.`DIM_Motivo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`DIM_Motivo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `DW_Cornea`.`FACT_Cornea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Cornea`.`FACT_Cornea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_tempo` INT NOT NULL,
  `id_prioridade` INT NOT NULL,
  `id_diagnostico` INT NOT NULL,
  `id_tipo_prodecimento` INT NOT NULL,
  `id_lateralidade` INT NOT NULL,
  `id_anestesia` INT NOT NULL,
  `id_motivo` INT NOT NULL,
  `id_paciente` INT NOT NULL,
  `numero_transplantes` INT NOT NULL,
  `idade` INT NOT NULL,
  `tempo_espera_anestesia` INT NOT NULL,
  `tempo_espera_cirurgia` INT NOT NULL,
  `tempo_espera_anest_cir` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk01_idx` (`id_tempo` ASC),
  INDEX `fk02_idx` (`id_prioridade` ASC),
  INDEX `fk03_idx` (`id_diagnostico` ASC),
  INDEX `fk04_idx` (`id_tipo_prodecimento` ASC),
  INDEX `fk05_idx` (`id_lateralidade` ASC),
  INDEX `fk06_idx` (`id_anestesia` ASC),
  INDEX `fk07_idx` (`id_motivo` ASC),
  INDEX `fk11_idx` (`id_paciente` ASC),
  CONSTRAINT `fk01`
    FOREIGN KEY (`id_tempo`)
    REFERENCES `DW_Cornea`.`DIM_Tempo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk02`
    FOREIGN KEY (`id_prioridade`)
    REFERENCES `DW_Cornea`.`DIM_Prioridade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk03`
    FOREIGN KEY (`id_diagnostico`)
    REFERENCES `DW_Cornea`.`DIM_Diagnostico` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk04`
    FOREIGN KEY (`id_tipo_prodecimento`)
    REFERENCES `DW_Cornea`.`DIM_Tipo_Procedimento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk05`
    FOREIGN KEY (`id_lateralidade`)
    REFERENCES `DW_Cornea`.`DIM_Lateralidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk06`
    FOREIGN KEY (`id_anestesia`)
    REFERENCES `DW_Cornea`.`DIM_Anestesia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk07`
    FOREIGN KEY (`id_motivo`)
    REFERENCES `DW_Cornea`.`DIM_Motivo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk11`
    FOREIGN KEY (`id_paciente`)
    REFERENCES `DW_Cornea`.`DIM_paciente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;