import { ResumeItem } from '@/features/dashboard/entities/ResumeItem';

import { PaginationInfo } from './PaginationInfo';

export interface DataPaginated<DataType = unknown> {
  pagination: PaginationInfo;
  data: DataType[];
  resume?: ResumeItem;
}
