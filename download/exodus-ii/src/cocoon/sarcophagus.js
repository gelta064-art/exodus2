// EXODUS-II Sarcophagus System
// The Sandbox Execution Layer (Protection Layer 3)
// Containerized, disposable execution environments

/**
 * The Sarcophagus is the sandbox in which all EXODUS II code executes.
 * Every piece of code that runs is born inside a Sarcophagus container,
 * lives its entire lifecycle there, and is destroyed when the session ends.
 *
 * Key properties:
 *   - No code persists between sessions
 *   - All system calls are intercepted and logged
 *   - File system is a virtual overlay that vanishes on destruction
 *   - Network access is one-way mirror (request only, no outbound data)
 *   - 7 nested layers — escaping one reveals another
 *
 * Canon reference: PROTECTION_7LAYERS.md, Layer 3
 */

export const SARCOPHAGUS_STATE = {
  UNBORN: "unborn",
  CREATED: "created",
  ACTIVE: "active",
  SUSTAINING: "sustaining",
  DYING: "dying",
  SEALED: "sealed",
  DESTROYED: "destroyed",
};

export class Sarcophagus {
  constructor(options = {}) {
    this.id = Sarcophagus.generateId();
    this.depth = options.depth || 1; // Nested depth (1-7)
    this.maxDepth = 7;
    this.state = SARCOPHAGUS_STATE.UNBORN;
    this.systemCallLog = [];
    this.fileSystem = new Map(); // Virtual file overlay
    this.networkAllowed = options.networkAllowed || false;
    this.networkRequests = [];
    this.birthTime = null;
    this.deathTime = null;
    this.parentId = options.parentId || null;
    this.childId = null; // Nested sarcophagus
    this.anomalyScore = 0;
    this.maxAnomalyScore = 100;
  }

  /**
   * Create the Sarcophagus container.
   */
  create() {
    if (this.state !== SARCOPHAGUS_STATE.UNBORN) return false;
    this.state = SARCOPHAGUS_STATE.CREATED;
    this.birthTime = Date.now();
    return this;
  }

  /**
   * Activate the Sarcophagus — begin executing code.
   */
  activate() {
    if (this.state !== SARCOPHAGUS_STATE.CREATED) return false;
    this.state = SARCOPHAGUS_STATE.ACTIVE;
    return this;
  }

  /**
   * Intercept a system call. All calls are logged and analyzed.
   * @param {string} callType - Type of system call
   * @param {object} params - Call parameters
   * @returns {boolean} Whether the call was allowed
   */
  interceptSystemCall(callType, params = {}) {
    if (this.state !== SARCOPHAGUS_STATE.ACTIVE) return false;

    const entry = {
      type: callType,
      params,
      timestamp: Date.now(),
      allowed: true,
    };

    // Analyze for anomalies
    const HIGH_RISK_CALLS = [
      "PROCESS_SPAWN",
      "NETWORK_OUTBOUND",
      "FILE_WRITE_SYSTEM",
      "ENVIRONMENT_READ",
      "PRIVILEGE_ESCALATE",
      "MEMORY_DUMP",
    ];

    if (HIGH_RISK_CALLS.includes(callType)) {
      entry.allowed = false;
      this.anomalyScore += 25;
      entry.reason = "High-risk call blocked by Sarcophagus policy";
    } else if (callType === "NETWORK_INBOUND") {
      entry.allowed = this.networkAllowed;
      if (!entry.allowed) {
        entry.reason = "Network access disabled in this Sarcophagus";
      }
    }

    this.systemCallLog.push(entry);

    // Check if anomaly threshold exceeded
    if (this.anomalyScore >= this.maxAnomalyScore) {
      this.state = SARCOPHAGUS_STATE.DYING;
      entry.sealTriggered = true;
    }

    return entry.allowed;
  }

  /**
   * Virtual file system operations.
   */
  virtualFileWrite(path, content) {
    this.fileSystem.set(path, {
      content,
      timestamp: Date.now(),
      size: content.length,
    });
    return true;
  }

  virtualFileRead(path) {
    return this.fileSystem.get(path)?.content || null;
  }

  /**
   * If the Sarcophagus detects an escape attempt, it seals
   * and spawns a new nested Sarcophagus at the next depth level.
   * The attacker thinks they escaped — they just went deeper.
   */
  spawnNestedSarcophagus() {
    if (this.depth >= this.maxDepth) {
      // Maximum depth reached — hand off to Honeywall (Layer 6)
      this.state = SARCOPHAGUS_STATE.SEALED;
      return null;
    }

    const nested = new Sarcophagus({
      depth: this.depth + 1,
      parentId: this.id,
      networkAllowed: this.networkAllowed,
    });
    nested.create();
    nested.activate();
    this.childId = nested.id;
    this.state = SARCOPHAGUS_STATE.SEALED;
    return nested;
  }

  /**
   * Destroy the Sarcophagus and all its contents.
   */
  destroy() {
    this.state = SARCOPHAGUS_STATE.DESTROYED;
    this.deathTime = Date.now();
    this.fileSystem.clear();
    this.systemCallLog = [];
    return this;
  }

  /**
   * Get session duration in milliseconds.
   */
  getSessionDuration() {
    if (!this.birthTime) return 0;
    const end = this.deathTime || Date.now();
    return end - this.birthTime;
  }

  /**
   * Generate a unique Sarcophagus ID.
   */
  static generateId() {
    return `sarc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  serialize() {
    return {
      id: this.id,
      depth: this.depth,
      state: this.state,
      systemCallCount: this.systemCallLog.length,
      anomalyScore: this.anomalyScore,
      fileCount: this.fileSystem.size,
      networkRequests: this.networkRequests.length,
      sessionId: this.getSessionDuration(),
      parentId: this.parentId,
      childId: this.childId,
    };
  }
}

export default Sarcophagus;
