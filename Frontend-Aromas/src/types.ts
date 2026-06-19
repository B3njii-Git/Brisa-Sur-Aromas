/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  notes: string[];
  imageUrl: string;
  volume: string; // e.g. "100ml"
}
