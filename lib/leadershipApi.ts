import { apiFetch } from './apiFetch';

export interface LeaderDto {
  id?: string;
  leaderName: string;
  leaderTitle: string;
  leaderImage: string;
  displayOrder: number;
}

const BASE_URL = '/api/v1/leadership';

export const leadershipApi = {
  /**
   * Fetch all leadership members
   */
  async getLeaders(): Promise<LeaderDto[]> {
    try {
      const data = await apiFetch<any[]>(BASE_URL);
      return data.map((item) => ({
        ...item,
        id: item.id || item._id,
      }));
    } catch (error) {
      console.error('Error fetching leaders:', error);
      return [];
    }
  },

  /**
   * Create a new leadership member
   */
  async createLeader(data: LeaderDto): Promise<LeaderDto> {
    return await apiFetch<LeaderDto>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update an existing leadership member
   */
  async updateLeader(id: string, data: LeaderDto): Promise<LeaderDto> {
    return await apiFetch<LeaderDto>(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a leadership member
   */
  async deleteLeader(id: string): Promise<boolean> {
    await apiFetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return true;
  }
};
