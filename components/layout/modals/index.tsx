'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export const LazyAddLessonModal = dynamic(
  async () =>
    (await import('@/components/modals/lessons/add-lesson')).AddLessonModal,
  {
    ssr: true,
  },
);

export const LazyEditLessonModal = dynamic(
  async () =>
    (await import('@/components/modals/lessons/edit-lesson')).EditLessonModal,
  {
    ssr: true,
  },
);

export const Modals = () => (
  <>
    <LazyAddLessonModal />
    <LazyEditLessonModal />
  </>
);
