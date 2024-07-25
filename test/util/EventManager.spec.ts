import test from 'ava';
import { EventManager } from '../../src/util/EventManager';

test('should subscribe a callback', t => {
  const eventManager = new EventManager<string>();
  const callback = (item: string) => t.is(item, 'test event');

  eventManager.subscribe(callback);
  eventManager.notify('test event');
});

test('should unsubscribe a callback', t => {
  const eventManager = new EventManager<string>();
  let callCount = 0;
  const callback = () => callCount++;

  eventManager.subscribe(callback);
  eventManager.unsubscribe(callback);
  eventManager.notify('test event');

  t.is(callCount, 0);
});

test('should notify all subscribers', t => {
  const eventManager = new EventManager<string>();
  const results: string[] = [];
  const callback1 = (item: string) => results.push(`callback1: ${item}`);
  const callback2 = (item: string) => results.push(`callback2: ${item}`);

  eventManager.subscribe(callback1);
  eventManager.subscribe(callback2);
  eventManager.notify('test event');

  t.deepEqual(results, ['callback1: test event', 'callback2: test event']);
});

test('should not fail if unsubscribing a non-subscribed callback', t => {
  const eventManager = new EventManager<string>();
  let callCount = 0;
  const callback1 = () => callCount++;
  const callback2 = () => callCount++;

  eventManager.subscribe(callback1);
  eventManager.unsubscribe(callback2);  // Unsubscribing a non-subscribed callback
  eventManager.notify('test event');

  t.is(callCount, 1);  // Only callback1 should have been called
});
