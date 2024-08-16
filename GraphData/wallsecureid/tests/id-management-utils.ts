import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/IDManagement/IDManagement"

export function createCertificationAddedEvent(
  CertificateHash: string,
  employeeAddress: Address
): CertificationAdded {
  let certificationAddedEvent = changetype<CertificationAdded>(newMockEvent())

  certificationAddedEvent.parameters = new Array()

  certificationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "CertificateHash",
      ethereum.Value.fromString(CertificateHash)
    )
  )
  certificationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )

  return certificationAddedEvent
}

export function createEmployeeAddedEvent(
  employeeAddress: Address,
  name: string,
  role: string,
  active: boolean,
  lastUpdated: BigInt,
  Certification: string
): EmployeeAdded {
  let employeeAddedEvent = changetype<EmployeeAdded>(newMockEvent())

  employeeAddedEvent.parameters = new Array()

  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam("active", ethereum.Value.fromBoolean(active))
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "lastUpdated",
      ethereum.Value.fromUnsignedBigInt(lastUpdated)
    )
  )
  employeeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "Certification",
      ethereum.Value.fromString(Certification)
    )
  )

  return employeeAddedEvent
}

export function createEmployeeUpdatedEvent(
  employeeAddress: Address,
  name: string,
  role: string,
  active: boolean,
  lastUpdated: BigInt,
  Certification: string
): EmployeeUpdated {
  let employeeUpdatedEvent = changetype<EmployeeUpdated>(newMockEvent())

  employeeUpdatedEvent.parameters = new Array()

  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )
  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("active", ethereum.Value.fromBoolean(active))
  )
  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "lastUpdated",
      ethereum.Value.fromUnsignedBigInt(lastUpdated)
    )
  )
  employeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "Certification",
      ethereum.Value.fromString(Certification)
    )
  )

  return employeeUpdatedEvent
}

export function createLocationAddedEvent(
  employeeAddress: Address,
  checkpointId: BigInt,
  latitude: string,
  longitude: string,
  timestamp: BigInt
): LocationAdded {
  let locationAddedEvent = changetype<LocationAdded>(newMockEvent())

  locationAddedEvent.parameters = new Array()

  locationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "employeeAddress",
      ethereum.Value.fromAddress(employeeAddress)
    )
  )
  locationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "checkpointId",
      ethereum.Value.fromUnsignedBigInt(checkpointId)
    )
  )
  locationAddedEvent.parameters.push(
    new ethereum.EventParam("latitude", ethereum.Value.fromString(latitude))
  )
  locationAddedEvent.parameters.push(
    new ethereum.EventParam("longitude", ethereum.Value.fromString(longitude))
  )
  locationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return locationAddedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
