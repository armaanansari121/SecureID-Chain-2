import {
  CertificationAdded as CertificationAddedEvent,
  EmployeeAdded as EmployeeAddedEvent,
  EmployeeUpdated as EmployeeUpdatedEvent,
  LocationAdded as LocationAddedEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  Unpaused as UnpausedEvent
} from "../generated/IDManagement/IDManagement"
import {
  CertificationAdded,
  EmployeeAdded,
  EmployeeUpdated,
  LocationAdded,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused
} from "../generated/schema"

export function handleCertificationAdded(event: CertificationAddedEvent): void {
  let entity = new CertificationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.CertificateHash = event.params.CertificateHash
  entity.employeeAddress = event.params.employeeAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeeAdded(event: EmployeeAddedEvent): void {
  let entity = new EmployeeAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.name = event.params.name
  entity.role = event.params.role
  entity.active = event.params.active
  entity.lastUpdated = event.params.lastUpdated
  entity.Certification = event.params.Certification

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmployeeUpdated(event: EmployeeUpdatedEvent): void {
  let entity = new EmployeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.name = event.params.name
  entity.role = event.params.role
  entity.active = event.params.active
  entity.lastUpdated = event.params.lastUpdated
  entity.Certification = event.params.Certification

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLocationAdded(event: LocationAddedEvent): void {
  let entity = new LocationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.employeeAddress = event.params.employeeAddress
  entity.checkpointId = event.params.checkpointId
  entity.latitude = event.params.latitude
  entity.longitude = event.params.longitude
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
