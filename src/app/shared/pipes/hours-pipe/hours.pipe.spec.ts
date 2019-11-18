import { HoursPipe } from 'src/app/shared/pipes/hours-pipe/hours.pipe';

describe('HoursPipe', () => {
  const pipe: HoursPipe = new HoursPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 88 min to 1 Hour(s) 28 Minutes', () => {
    expect(pipe.transform(88)).toBe('1 Hour(s) 28 Minutes');
  });
});
