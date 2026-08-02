'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { UIGallery } from '@/shared/ui';

export interface IProjectGalleryProps {
  readonly images: readonly string[];
  readonly title: string;
}

/**
 * Галерея скриншотов проекта: локализует подписи и отдаёт остальное `UIGallery`.
 * Client-компонент — тексты нужны внутри колбэков-форматтеров.
 */
export const ProjectGallery: FC<IProjectGalleryProps> = ({ images, title }) => {
  const t = useTranslations('ProjectGallery');

  return (
    <UIGallery
      images={images}
      altFor={(index) => t('screenshotAlt', { title, index: index + 1 })}
      openLabelFor={(index) => t('openScreenshot', { index: index + 1 })}
      dialogLabel={t('galleryAria', { title })}
      closeLabel={t('close')}
      prevLabel={t('prev')}
      nextLabel={t('next')}
      dataName="project"
    />
  );
};
