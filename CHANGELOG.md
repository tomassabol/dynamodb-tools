# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

See also [API Changelog](https://gymbeam.atlassian.net/wiki/spaces/BOX/pages/2409529345)

## [1.0.19] - 2025-08-28

### Added

- Add addArraySizeFilterCondition for query builder

## [1.0.18] - 2025-03-17

### Added

- Add list append to update builder

## [1.0.17] - 2024-07-09

### Added

- Add filter IN operator for query builder

## [1.0.16] - 2024-06-27

### Added

- SCT-1137 Add DynamoDB utils from OMS

## [1.0.15] - 2024-03-13

### Added

- Add logEvents option to stream handler

## [1.0.14] - 2024-02-29

### Fixed

- Fix idempotency in DynamoDB stream handler

## [1.0.13] - 2024-02-29

### Changed

- Improve idempotency handling in DynamoDB stream handler

## [1.0.12] - 2024-02-28

### Added

- Add idempotency for DynamoDB Stream handler

## [1.0.11] - 2024-02-19

### Added

- Add ifAttributeNotExists method for UpdateCommandBuilder

## [1.0.10] - 2024-01-25

### Added

- Add addExistentialFilterCondition for QueryCommandBuilder

## [1.0.8] - 2023-11-08

### Security

- Fix vulnerabilities

## [1.0.7] - 2023-09-23

### Added

- Add IN operator for UpdateCommandBuilder.addCondition

## [1.0.6] - 2023-09-20

### Fixed

- Rename deleteAttribute to removeAttribute and fix it

## [1.0.5] - 2023-09-20

### Fixed

- Fix deleteAttribute method

## [1.0.4] - 2023-09-20

### Added

- Add deleteAttribute method for update command builder

## [1.0.3] - 2023-09-20

### Fixed

- Fix duplicated value names in update command builder

## [1.0.2] - 2023-09-20

### Added

- Add addCondition method for update command builder

## [1.0.1] - 2023-09-19

### Added

- Add startKey option for query iterators

## [1.0.0] - 2023-03-20

### Added

- First release
