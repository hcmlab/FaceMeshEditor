import { describe, it, expect, vi } from 'vitest';
import { Graph } from '../../graph/graph';
import { Point2D } from '../../graph/point2d';
import { SaveStatus } from '../../enums/saveStatus';
import { FileAnnotationHistory } from '../fileAnnotationHistory';

vi.mock('../../imageFile');

import { ImageFile } from '../../imageFile';

function generateMockedGraph() {
  const x = Math.random() * 100; // Random number between 0 and 100
  const y = Math.random(); // Random number between 0 and 1
  const z = Math.random(); // Random number between 0 and 1
  const neighbors = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]; // Random numbers between 0 and 10

  return new Graph<Point2D>([new Point2D(x, y, z, neighbors)]);
}

const mockFile = 'test';

describe('FileAnnotationHistory', () => {
  it('initializes properly', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);

    expect(history.file).eq(file);
    expect(history.status).eq(SaveStatus.unedited);
  });

  it('retrieves the correct file', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);

    expect(history.file).eq(file);
  });

  it('updates the status', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);

    expect(history.status).eq(SaveStatus.unedited);
    history.status = SaveStatus.saved;
    expect(history.status).eq(SaveStatus.saved);
  });

  it('adds new item to history', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);
    const graph = generateMockedGraph();

    // state before addition
    expect(history.isEmpty());

    history.add(graph);

    // state after addition
    expect(!history.isEmpty());
    expect(history.get()).toStrictEqual(graph);
  });

  it('moves history index correctly', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);
    const graph1 = generateMockedGraph();
    const graph2 = generateMockedGraph();

    history.add(graph1);
    history.add(graph2);
    expect(history.get()).toStrictEqual(graph2);

    history.previous();
    expect(history.get()).toStrictEqual(graph1);

    history.next();
    expect(history.get()).toStrictEqual(graph2);
  });

  it('clears properly', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);

    history.add(generateMockedGraph());
    history.clear();
    expect(history.get()).toBe(null);
  });

  it('marks as sent properly', () => {
    const file = ImageFile.create(mockFile);
    const history = new FileAnnotationHistory(file, 10);

    history.add(generateMockedGraph());
    history.markAsSent();
    expect(history.status).eq(SaveStatus.unedited);
  });
});
