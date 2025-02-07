import { useSearchParams, useRouter } from 'next/navigation';

export function useModalState(
  modalName: string,
  modalField: string | string[] = 'modal',
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fields = Array.isArray(modalField) ? modalField : [modalField];
  const isOpen = fields.some((field) => searchParams.get(field) === modalName);

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    fields.forEach((field) => params.set(field, modalName));
    router.replace(`?${params.toString()}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    fields.forEach((field) => params.delete(field));

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl);
  };

  return { isOpen, handleClose, handleOpen };
}
