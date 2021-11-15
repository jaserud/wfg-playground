module.exports = function (data) {
  const currAnalysis = data.data.analyses.content[0];
  if (!currAnalysis) {
    return reject(`Analysis is not found!`);
  }

  for (const run of currAnalysis.completedRuns) {
    if (run.publishedAnalyses.length > 0) {
      return reject(
        `Analysis with ID ${currAnalysis.analysisId} has already had a completed open access run!`
      );
    }
  }

  return {
    study_id: currAnalysis.studyId,
    analysis_id: currAnalysis.analysisId,
    song_url: 'https://song.rdpc-dev.cancercollaboratory.org',
    score_url: 'https://score.rdpc-dev.cancercollaboratory.org',
    regions_file:
      '<SCHEDULED_DIR>/reference/open-access-variant-filtering/open_access.20210318.bed.gz',
    cpus: 8,
    mem: 40,
    cleanup: true,
    max_retries: 3,
    first_retry_wait_time: 5,
  };
};
