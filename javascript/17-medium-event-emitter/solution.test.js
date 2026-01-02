const { EventEmitter } = require('./solution');

describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  describe('on and emit', () => {
    test('should call listener when event is emitted', () => {
      const listener = jest.fn();
      emitter.on('test', listener);
      emitter.emit('test');

      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should pass arguments to listener', () => {
      const listener = jest.fn();
      emitter.on('test', listener);
      emitter.emit('test', 'arg1', 'arg2');

      expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
    });

    test('should support multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      emitter.on('test', listener1);
      emitter.on('test', listener2);
      emitter.emit('test');

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });

    test('should call listeners in order', () => {
      const order = [];
      emitter.on('test', () => order.push(1));
      emitter.on('test', () => order.push(2));
      emitter.on('test', () => order.push(3));
      emitter.emit('test');

      expect(order).toEqual([1, 2, 3]);
    });
  });

  describe('off', () => {
    test('should remove specific listener', () => {
      const listener = jest.fn();
      emitter.on('test', listener);
      emitter.off('test', listener);
      emitter.emit('test');

      expect(listener).not.toHaveBeenCalled();
    });

    test('should only remove specified listener', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      emitter.on('test', listener1);
      emitter.on('test', listener2);
      emitter.off('test', listener1);
      emitter.emit('test');

      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalledTimes(1);
    });

    test('should handle removing non-existent listener', () => {
      const listener = jest.fn();
      expect(() => emitter.off('test', listener)).not.toThrow();
    });
  });

  describe('once', () => {
    test('should only call listener once', () => {
      const listener = jest.fn();
      emitter.once('test', listener);

      emitter.emit('test');
      emitter.emit('test');
      emitter.emit('test');

      expect(listener).toHaveBeenCalledTimes(1);
    });

    test('should pass arguments to once listener', () => {
      const listener = jest.fn();
      emitter.once('test', listener);
      emitter.emit('test', 'arg1', 'arg2');

      expect(listener).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('multiple events', () => {
    test('should handle different events separately', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      emitter.on('event1', listener1);
      emitter.on('event2', listener2);

      emitter.emit('event1');
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).not.toHaveBeenCalled();
    });
  });
});

