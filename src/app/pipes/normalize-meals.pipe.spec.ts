import { NormalizeMealsPipe } from './normalize-meals.pipe';

describe('NormalizeMealsPipe', () => {
  it('create an instance', () => {
    const pipe = new NormalizeMealsPipe();
    expect(pipe).toBeTruthy();
  });
});
