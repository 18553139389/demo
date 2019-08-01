import uuidV1 from '../../node_modules/uuid/v1'
import uuidV3 from '../../node_modules/uuid/v3'
import uuidV4 from '../../node_modules/uuid/v4'
import uuidV5 from '../../node_modules/uuid/v5'

export default {
  /**
   * UUID Generate
   * @param version v1 timestamp|v4 random
   * @returns {string}
   */
  generate (version) {
    if (version === undefined || version === null || version === '') version = 'v1'
    let uuid = ''
    switch (version) {
      case 'v1':
        uuid = uuidV1()
        break
      case 'v4':
        uuid = uuidV4()
        break
      default:
        uuid = uuidV1()
    }
    return uuid
  },
  /**
   * UUID V3 (MD5) namespace|
   * @param name
   * @param namespaceUuid
   * @returns {string}
   */
  uuidV3 (name, namespaceUuid) {
    if (namespaceUuid === undefined || namespaceUuid === null || namespaceUuid === '') namespaceUuid = uuidV3.DNS
    return uuidV3(name, namespaceUuid)
  },
  /**
   * UUID V5 (SHA1) namespace|
   * @param name
   * @param namespaceUuid
   * @returns {string}
   */
  uuidV5 (name, namespaceUuid) {
    if (namespaceUuid === undefined || namespaceUuid === null || namespaceUuid === '') namespaceUuid = uuidV5.DNS
    return uuidV5(name, namespaceUuid)
  }
}
