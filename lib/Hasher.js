"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MD5Hasher_1 = require("./MD5Hasher");
/**
 * Abstract hasher template.
 *
 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
 */
class Hasher {
    /**
     * Initializes a newly created hasher.
     *
     * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
     *
     * @example
     *
     *     var hasher = CryptoJS.algo.SHA256.create();
     */
    constructor(buffer) {
        this.buffer = buffer;
        this.md5 = new MD5Hasher_1.MD5(buffer);
        // Set initial values
        this.reset();
    }
    /**
     * Resets this hasher to its initial state.
     *
     * @example
     *
     *     hasher.reset();
     */
    reset() {
        // Reset data buffer
        this.buffer.reset(); // call
        // Perform concrete-hasher logic
        this.md5.doReset();
    }
    /**
     * Updates this hasher with a message.
     *
     * @param {WordArray|string} messageUpdate The message to append.
     *
     * @return {Hasher} This hasher.
     *
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    update(messageUpdate) {
        // Append
        this.buffer.append(messageUpdate);
        // Update the hash
        this.buffer.process(false, this.md5);
        // Chainable
        return this;
    }
    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     *
     * @return {WordArray} The hash.
     *
     * @example
     *
     *     var hash = hasher.finalize();
     *     var hash = hasher.finalize('message');
     *     var hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate) {
        // Final message update
        if (messageUpdate) {
            this.buffer.append(messageUpdate);
        }
        // Perform concrete-hasher logic
        const hash = this.md5.doFinalize();
        return hash;
    }
}
exports.Hasher = Hasher;
