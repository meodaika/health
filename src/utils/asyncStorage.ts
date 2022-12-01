/* import { AsyncLocalStorage } from "async_hooks"
import { IJwtPayload } from "../interfaces/jwtPayload.interface"
const context = new AsyncLocalStorage()

export const setCurrentUserContext = (currentUser: IJwtPayload) => {
  const store = new Map()
  store.set("currentUser", 123)
  console.log("set curre", currentUser)
  context.run(store, () => {
    console.log(context.getStore())
    console.log("jfklsdj")
    return 234
  })
}

export const getCurrentUserContext = () => {
  const store = context.getStore() as any
  console.log("store", store)
  const currentUser = store.get("currentUser")
  return currentUser
}
 */

import asyncHooks from "async_hooks"
import { v4 } from "uuid"
const store = new Map()

const asyncHook = asyncHooks.createHook({
  init: (asyncId, _, triggerAsyncId) => {
    if (store.has(triggerAsyncId)) {
      store.set(asyncId, store.get(triggerAsyncId))
    }
  },
  destroy: (asyncId) => {
    if (store.has(asyncId)) {
      store.delete(asyncId)
    }
  },
})

asyncHook.enable()

export const createRequestContext = (data: any, requestId = v4()) => {
  const requestInfo = { requestId, data }
  store.set(asyncHooks.executionAsyncId(), requestInfo)
}

export const getRequestContext = () => {
  return store.get(asyncHooks.executionAsyncId())
}
