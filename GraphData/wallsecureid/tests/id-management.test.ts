import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CertificationAdded } from "../generated/schema"
import { CertificationAdded as CertificationAddedEvent } from "../generated/IDManagement/IDManagement"
import { handleCertificationAdded } from "../src/id-management"
import { createCertificationAddedEvent } from "./id-management-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let CertificateHash = "Example string value"
    let employeeAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCertificationAddedEvent = createCertificationAddedEvent(
      CertificateHash,
      employeeAddress
    )
    handleCertificationAdded(newCertificationAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CertificationAdded created and stored", () => {
    assert.entityCount("CertificationAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CertificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "CertificateHash",
      "Example string value"
    )
    assert.fieldEquals(
      "CertificationAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "employeeAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
