import type { LegacyRef } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

type Props = {
  /**
   * Whether multiple files can be uploaded
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether the receiver of the event is the entire window or just scoped to the component.
   * @default 'window'
   */
  dragScope?: 'window' | 'self';

  /**
   * The name of the input field for a form.
   */
  name?: string;
};

export default function FileDropField({
  multiple = false,
  dragScope = 'window',
  name = '',
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragRejected, setIsDragRejected] = useState(false);

  const dropFieldRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
    setIsDragRejected(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
    setIsDragRejected(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);
      setIsDragRejected(false);

      if (!event.dataTransfer) return;

      const { files: droppedFiles } = event.dataTransfer;

      if (droppedFiles.length) {
        const files = Array.from(droppedFiles);

        if (multiple) {
          setFiles(files);
        } else {
          setFiles([files[0]]);
        }
      }
    },
    [setFiles, multiple]
  );

  const handleFileDelete = (file: File) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };

  useEffect(() => {
    let el: LegacyRef<typeof dropFieldRef> | Window;
    const currentRef = dropFieldRef.current;

    if (dragScope === 'self' && currentRef) {
      el = currentRef;
    } else {
      el = window;
    }

    el.addEventListener('dragenter', handleDragEnter);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('drop', handleDrop);

    return () => {
      if (dragScope === 'self' && currentRef) {
        el = currentRef;
      } else {
        el = window;
      }

      el.removeEventListener('dragenter', handleDragEnter);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('drop', handleDrop);
    };
  }, [dragScope, handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  if (fileInputRef.current && files.length > 0) {
    const transfer = new DataTransfer();
    files.forEach((file) => transfer.items.add(file));
    fileInputRef.current.files = transfer.files;
  }

  return (
    <div
      draggable="true"
      ref={dropFieldRef}
      className={`
        flex flex-col gap-5 rounded-lg border-4 p-5 transition-colors
        ${!isDragging && !isDragRejected ? 'border-neutral-200' : ''}
        ${isDragging ? 'border-neutral bg-neutral-200' : ''}
        ${isDragRejected ? 'bg-red' : ''}
      `}
    >
      <p className="text-neutral-400">
        {isDragging
          ? 'Laat de afbeelding los ...'
          : 'Klik en sleep een afbeelding voor je avatar hierheen.'}
      </p>

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file) => (
            <li className="flex flex-row justify-between" key={file.name}>
              <div className="flex flex-row items-center gap-2">
                <FileIcon file={file} />
                {file.name}
              </div>

              <DeleteButton
                onClick={() => {
                  handleFileDelete(file);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <input
        className="hidden"
        ref={fileInputRef}
        type="file"
        name={name}
        hidden
      />
    </div>
  );
}

const FileIcon = ({ file }: { file: File }) => {
  if (file.type.startsWith('image/')) {
    return (
      <img
        className="aspect-square h-auto w-10 object-cover"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
    );
  }

  return (
    <span className="text-display-m">
      <Icon name="file-lines" />
    </span>
  );
};

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="cursor-pointer opacity-50 transition-opacity hover:opacity-100"
    onClick={onClick}
  >
    <Icon name="trash-alt" />
  </button>
);
