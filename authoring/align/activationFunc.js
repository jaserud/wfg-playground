module.exports = function (data) {
  const currAnalysis = data.data.analyses.content[0];
  if (!currAnalysis) {
    reject(`Analysis is empty!`);
  }

  const isAnalysisBeenAligned =
    currAnalysis.completedAlignRuns.length > 0 &&
    currAnalysis.completedAlignRuns[0].publishedAlignAnalyses.length > 0;
  if (isAnalysisBeenAligned) {
    reject(`Analysis with ID ${currAnalysis.analysisId} has already been aligned!`);
  }

  return {
    analysis_id: currAnalysis.analysisId,
    study_id: currAnalysis.studyId,
    score_url: 'https://score.rdpc-dev.cancercollaboratory.org',
    song_url: 'https://song.rdpc-dev.cancercollaboratory.org',
    ref_genome_fa: '<SCHEDULED_DIR>/reference/GRCh38_hla_decoy_ebv/GRCh38_hla_decoy_ebv.fa',
    download: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
      score_url: 'https://submission-score.rdpc-dev.cancercollaboratory.org',
      song_url: 'https://submission-song.rdpc-dev.cancercollaboratory.org',
    },
    cpu: 6,
    mem: 18,
  };
};
