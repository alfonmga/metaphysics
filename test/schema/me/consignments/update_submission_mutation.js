import { runAuthenticatedQuery } from "test/utils"
import { config as updateSubmissionMutation } from "schema/me/consignments/update_submission_mutation.js"

describe("UpdateSubmissionMutation", () => {
  it("includes the id param", () => {
    const mutation = updateSubmissionMutation
    expect(Object.keys(mutation.inputFields)).toContain("id")
  })

  it("includes the state param", () => {
    const mutation = updateSubmissionMutation
    expect(Object.keys(mutation.inputFields)).toContain("state")
  })

  it("updates a submission and returns its new data payload", () => {
    const mutation = `
      mutation {
        updateConsignmentSubmission(
          input: { id: "108", artist_id: "andy-warhol", depth: "123", clientMutationId: "123123" }
        ) {
          clientMutationId
          submission {
            depth
          }
        }
      }
    `

    const rootValue = {
      submissionUpdateLoader: () =>
        Promise.resolve({
          id: "106",
          artist_id: "andy-warhol",
        }),
    }

    return runAuthenticatedQuery(mutation, rootValue).then(({ submissionUpdateLoader }) => {
      expect(submissionUpdateLoader).toMatchSnapshot()
    })
  })
})
