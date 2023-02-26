## [Unreleased]

## [1.5.0] - 2023-02-26

- Fix incorrect error parsing
- Improve reliability of outgoing requests

## [1.4.0] - 2022-11-28

- Use friendlier duration format (e.g., `2s`, `30m`, `24h`)
- Remove days, weeks, months, and years from `Duration` to avoid confusion
  across daylight savings time zone transitions
- Remove `tinyduration` dependency

## [1.3.1] - 2022-11-18

- Fix for when error JSON was not parsed correctly (fixes [#181](https://github.com/mergentlabs/mergent-js/issues/181))

## [1.3.0] - 2022-11-03

- Add method to run a Task immediately (`tasks.run`)

## [1.2.0] - 2022-10-31

- Add methods to retrieve, update, delete, and list Tasks
  - Specifically, `tasks.retrieve`, `tasks.update`, `tasks.delete`, `tasks.list`

## [1.1.0] - 2022-10-18

- We've made it easier to schedule a Task using a `Date`, or delay a Task using a `Duration`.
  - Add `Task#delay: Duration` to simplify the construction of ISO 8601 Durations
  - Deprecate `Task#scheduled_for: String` in favor of `Task#scheduledFor: Date`

## [1.0.0] - 2022-03-10

- Switch to the V2 API
  - Add `id` attribute to Task
  - Make `name` optional
  - Add optional `queue` attribute to Task that defaults to `default`
  - Remove `description` from Task
- Add support for creating Schedules

## [0.1.2] - 2022-01-20

- Add `RequestValidator` to validate that webhooks came from Mergent's API

## [0.1.1] - 2022-01-20

- Add `RequestValidator` to validate that webhooks came from Mergent's API

## [0.1.0] - 2022-01-20

- Add `RequestValidator` to validate that webhooks came from Mergent's API

## [0.0.5] - 2022-01-11

- Fix types

## [0.0.4] - 2022-01-11

- Fix types

## [0.0.3] - 2022-01-11

- Fix npm distribution

## [0.0.2] - 2022-01-05

- Initial release
