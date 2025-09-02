import { AgentItem } from '@/database/schemas/agent';
import { ChatGroupAgentItem } from '@/database/schemas/chatGroup';

import { LobeAgentConfig } from '../agent';
import { MetaData } from '../meta';

export enum LobeSessionType {
  Agent = 'agent',
  Group = 'group',
}

/**
 * Extended group member that includes both relation data and agent details
 */
export type GroupMemberWithAgent = ChatGroupAgentItem & AgentItem;

/**
 * Lobe Agent Session
 */
export interface LobeAgentSession {
  config: LobeAgentConfig;
  createdAt: Date;
  group?: string;
  id: string;
  meta: MetaData;
  model: string;
  pinned?: boolean;
  tags?: string[];
  type: LobeSessionType.Agent;
  updatedAt: Date;
}

/**
 * Group chat (not confuse with session group)
 */
export interface LobeGroupSession {
  createdAt: Date;
  group?: string;
  id: string; // Start with 'cg_'
  members?: GroupMemberWithAgent[];
  meta: MetaData;
  pinned?: boolean;
  tags?: string[];
  type: LobeSessionType.Group;
  updatedAt: Date;
}

export interface LobeAgentSettings {
  /**
   * 语言模型角色设定
   */
  config: LobeAgentConfig;
  meta: MetaData;
}

// Union type for all session types
export type LobeSession = LobeAgentSession | LobeGroupSession;

export type LobeSessions = LobeSession[];
