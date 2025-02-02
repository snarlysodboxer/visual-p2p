import Corestore from 'corestore'
import Hypercore from 'hypercore'
import b4a from 'b4a'
import { connectionChannelPort } from './messageChannels'

type Connection = { on: (arg0: string, arg1: (data: any) => void) => void }

class RemotePeer {
  public name = ''
  public connection: Connection
  public store: Corestore
  public identityCore: Hypercore
  public messageCore: Hypercore

  constructor(connection: Connection, store: Corestore) {
    this.connection = connection
    this.store = store

    this.listen()
  }

  listen() {
    this.connection.on('data', async (data) => {
      const { name, identityCoreKey } = this.parseConnectionData(data)
      if (identityCoreKey && name) {
        this.name = name
        await this.setupCores(b4a.from(identityCoreKey, 'hex'))
        connectionChannelPort.postMessage(`cores setup with ${name}`)
      }
    })
  }

  parseConnectionData(data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return {}
    }
  }

  async setupCores(key: string) {
    this.identityCore = this.store.get({
      key: b4a.from(key, 'hex'),
      valueEncoding: 'json',
    })
    await this.identityCore.ready()
    await this.identityCore.update()
    const identity = await this.identityCore.get(0)

    this.messageCore = this.store.get({
      key: b4a.from(identity.messageCoreKey, 'hex'),
      valueEncoding: 'utf-8',
    })

    this.messageCore.on('append', () => {
      const seq = this.messageCore.length - 1
      this.messageCore.get(seq).then((block) => {
        connectionChannelPort.postMessage(`${this.name}: ${block}`)
      })
    })
  }
}

export default RemotePeer
